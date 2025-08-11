import { createContext, useContext, useState, useEffect } from "react";
import { cats } from "../data/cats";

const FormContext = createContext();

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personality: null,
    dailyRoutine: null,
    freeTime: null,
    energy: null,
    affectionate: null,
    talkativeness: null,
    volume: null,
    homeType: null,
    otherPresence: null,
  });

  // Load saved forms from localStorage on component mount
  const [savedForms, setSavedForms] = useState(() => {
    try {
      const saved = localStorage.getItem('catter-saved-forms');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Error loading saved forms from localStorage:', error);
      return {};
    }
  });

  // Load current form data from localStorage on component mount
  useEffect(() => {
    try {
      const savedFormData = localStorage.getItem('catter-current-form');
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    } catch (error) {
      console.error('Error loading current form data from localStorage:', error);
    }
  }, []);

  // Save current form data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('catter-current-form', JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving current form data to localStorage:', error);
    }
  }, [formData]);

  // Save savedForms to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('catter-saved-forms', JSON.stringify(savedForms));
    } catch (error) {
      console.error('Error saving forms to localStorage:', error);
    }
  }, [savedForms]);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function saveFormData(username) {
    if (!username) {
      console.warn("Username is required to save form");
      return null;
    }

    try {
      const response = await fetch(
        'https://noggin.rea.gent/dusty-trout-2649',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer rg_v1_k6pdg0bby33rbjsh59l3vcxsov9y604fzhax_ngk',
          },
          body: JSON.stringify({
            // fill variables here.
            "catsInfo": JSON.stringify(cats),
            "userInfo": JSON.stringify(formData),
          }),
        }
      );

      const json = await response.json(); // or .json() if you're expecting JSON

      const submission = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        data: { ...formData },
        catRanking: json
      };

      console.log(submission)

      setSavedForms((prev) => {
        const userForms = prev[username] || [];
        const newSavedForms = {
          ...prev,
          [username]: [...userForms, submission],
        };
        return newSavedForms;
      });

      console.log(`Form saved for user "${username}":`, submission);
      return submission.id;

    } catch (err) {
      console.error("Error fetching response:", err);
    }
  };

  const getSavedFormsByUsername = (username) => savedForms[username] || [];

  const clearAllForms = () => {
    setSavedForms({});
    // Also clear from localStorage
    try {
      localStorage.removeItem('catter-saved-forms');
      localStorage.removeItem('catter-current-form');
      // Reset current form data too
      setFormData({
        personality: null,
        dailyRoutine: null,
        freeTime: null,
        energy: null,
        affectionate: null,
        talkativeness: null,
        volume: null,
        homeType: null,
        otherPresence: null,
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
    console.log("All saved forms cleared");
  };

  const clearCurrentForm = () => {
    const emptyForm = {
      personality: null,
      dailyRoutine: null,
      freeTime: null,
      energy: null,
      affectionate: null,
      talkativeness: null,
      volume: null,
      homeType: null,
      otherPresence: null,
    };
    setFormData(emptyForm);
    try {
      localStorage.setItem('catter-current-form', JSON.stringify(emptyForm));
    } catch (error) {
      console.error('Error clearing current form from localStorage:', error);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        saveFormData,
        getSavedFormsByUsername,
        clearAllForms,
        clearCurrentForm,
        savedForms,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};