import React from 'react';

const profile = {
    name: 'E',
    age: 24,
    bio: 'Cat lover, world explorer, part-time meme curator.',
    image:
        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80', // replace with your own
};

const MainPage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <img src={profile.image} alt="Profile" style={styles.image} />
                <h2 style={styles.name}>
                    {profile.name}, {profile.age}
                </h2>
                <p style={styles.bio}>{profile.bio}</p>
                <div style={styles.buttonRow}>
                    <button style={styles.nope}>❌</button>
                    <button style={styles.like}>❤️</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
    },
    card: {
        width: 320,
        padding: 20,
        borderRadius: 16,
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 400,
        objectFit: 'cover',
        borderRadius: 12,
    },
    name: {
        marginTop: 16,
        marginBottom: 8,
    },
    bio: {
        fontSize: 14,
        color: '#555',
        marginBottom: 16,
    },
    buttonRow: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    nope: {
        fontSize: 24,
        background: '#fff',
        border: '2px solid #ff6b6b',
        color: '#ff6b6b',
        borderRadius: '50%',
        width: 60,
        height: 60,
        cursor: 'pointer',
    },
    like: {
        fontSize: 24,
        background: '#fff',
        border: '2px solid #4cd137',
        color: '#4cd137',
        borderRadius: '50%',
        width: 60,
        height: 60,
        cursor: 'pointer',
    },
};

export default MainPage;
