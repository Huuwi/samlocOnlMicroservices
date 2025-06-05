import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './GachaMachine.css';

const GachaMachine = () => {
    const [isGachaInProgress, setIsGachaInProgress] = useState(false);
    const [currentItem, setCurrentItem] = useState<string | null>(null);
    const capsuleControls = useAnimation();

    const items = ['Toy Car', 'Doll', 'Keychain', 'Sticker', 'Candy'];

    const handleGacha = async () => {
        if (isGachaInProgress) return;
        setIsGachaInProgress(true);
        setCurrentItem(null);

        await capsuleControls.start({ y: 0, transition: { duration: 1 } });
        await capsuleControls.start({
            rotate: [0, -10, 10, -10, 10, 0],
            transition: { duration: 0.5, repeat: 3 }
        });
        await capsuleControls.start({ scale: 1.2, transition: { duration: 0.5 } });

        const randomIndex = Math.floor(Math.random() * items.length);
        setCurrentItem(items[randomIndex]);
        setIsGachaInProgress(false);
        capsuleControls.start({ y: -100, scale: 1 });
    };

    return (
        <div className="gacha-machine">
            <button onClick={handleGacha} disabled={isGachaInProgress}>
                Turn Handle
            </button>
            <div className="capsule-container">
                {isGachaInProgress && (
                    <motion.div
                        className="capsule"
                        initial={{ y: -100, scale: 1 }}
                        animate={capsuleControls}
                    >
                        ???
                    </motion.div>
                )}
            </div>
            <div className="result-container">
                {currentItem && !isGachaInProgress && (
                    <div className="item-display">
                        {currentItem}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GachaMachine;