import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Pencil, Save } from "lucide-react";
import HeaderBar from "@/components/HeaderBar";
import NavBar from "@/components/NavBar";
import cat from "../assets/cat.jpg";

const ProfilePage = () => {
    const [editMode, setEditMode] = useState(false);
    const [image, setImage] = useState(cat);

    const [catDetails, setCatDetails] = useState({
        name: "Nono",
        years: 0,
        months: 2,
        breed: "Tabby",
        weight: 2.4,
        weightUnit: "kg",
        color: "Orange",
        sex: "Male",
        spayed: "Yes",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCatDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    const toggleEdit = () => setEditMode((prev) => !prev);

    return (
         <div className="relative h-screen bg-white flex flex-col items-center">
            {/* Header */}
            <HeaderBar/>

            <Card className="relative mt-12 w-[90%] max-w-md bg-pink-50 text-center p-6 rounded-3xl shadow-md">
                <button
                    onClick={toggleEdit}
                    className="absolute top-2 right-2 bg-rose-200 rounded-full p-2 shadow-md flex items-center justify-center"
                >
                    {editMode ? <Save size={16} className="text-white" /> : <Pencil size={16} className="text-white" />}
                </button>

                {editMode ? (
                    <input
                        type="text"
                        name="name"
                        value={catDetails.name}
                        onChange={handleChange}
                        className="text-3xl font-bold mb-4 text-center border rounded px-2 py-1 w-full"
                    />
                ) : (
                    <h1 className="text-3xl font-bold mb-4">{catDetails.name}</h1>
                )}

                <div className="relative inline-block">
                    <div className="w-full aspect-[2955/3694] overflow-hidden shadow-md mx-auto">
                        <img src={image} alt="Cat" className="w-full h-full object-cover" />
                    </div>
                    {editMode && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
                        />
                    )}
                </div>

                <div className="mt-4 flex flex-col justify-center items-center">
                    <div className="flex flex-col items-start gap-3 w-full">
                        {editMode ? (
                            <>
                                {/* Age */}
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="number"
                                        name="years"
                                        value={catDetails.years}
                                        onChange={handleChange}
                                        className="border rounded px-2 py-1 w-16"
                                    />
                                    <span>years</span>
                                    <input
                                        type="number"
                                        name="months"
                                        value={catDetails.months}
                                        onChange={handleChange}
                                        className="border rounded px-2 py-1 w-16"
                                    />
                                    <span>months</span>
                                </div>

                                {/* Breed */}
                                <input
                                    type="text"
                                    name="breed"
                                    value={catDetails.breed}
                                    onChange={handleChange}
                                    className="border rounded px-2 py-1 w-full"
                                />

                                {/* Weight */}
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="number"
                                        name="weight"
                                        value={catDetails.weight}
                                        onChange={handleChange}
                                        className="border rounded px-2 py-1 w-20"
                                    />
                                    <select
                                        name="weightUnit"
                                        value={catDetails.weightUnit}
                                        onChange={handleChange}
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="kg">kg</option>
                                        <option value="lbs">lbs</option>
                                    </select>
                                </div>

                                {/* Color */}
                                <input
                                    type="text"
                                    name="color"
                                    value={catDetails.color}
                                    onChange={handleChange}
                                    className="border rounded px-2 py-1 w-full"
                                />

                                {/* Sex */}
                                <select
                                    name="sex"
                                    value={catDetails.sex}
                                    onChange={handleChange}
                                    className="border rounded px-2 py-1 w-full"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>

                                {/* Spayed */}
                                <select
                                    name="spayed"
                                    value={catDetails.spayed}
                                    onChange={handleChange}
                                    className="border rounded px-2 py-1 w-full"
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </>
                        ) : (
                            <>
                                <span><strong>Age:</strong> {catDetails.years} years {catDetails.months} months</span>
                                <span><strong>Breed:</strong> {catDetails.breed}</span>
                                <span><strong>Weight:</strong> {catDetails.weight} {catDetails.weightUnit}</span>
                                <span><strong>Color:</strong> {catDetails.color}</span>
                                <span><strong>Sex:</strong> {catDetails.sex}</span>
                                <span><strong>Spayed:</strong> {catDetails.spayed}</span>
                            </>
                        )}
                    </div>
                </div>
            </Card>
            <NavBar />
        </div>
    );
};

export default ProfilePage;
