'use client'

import styles from './style.module.scss'
import Image from 'next/image'
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function Home() {

    const firstText = useRef(null);
    const secondText = useRef(null);
    let xPercent = 0;
    let direction = -1;

    useEffect( () => {
        requestAnimationFrame(animation);
    },[])

    const animation = () => {
        if (xPercent <= -100){
            xPercent = 0;
        }
        gsap.set(firstText.current, {xPercent: xPercent})
        gsap.set(secondText.current, {xPercent,xPercent})
        xPercent += 0.05 * direction;
        requestAnimationFrame(animation);

    }

    return (
        <main className={styles.main}>
            <Image
                fill={true}
                src="/images/background.jpg"
                alt="image"
            ></Image>

            <div className={styles.sliderContainer}>
                <div className={styles.slider}>
                    <p ref={firstText}>Fullstack Developer -</p>
                    <p ref={secondText}>Fullstack Developer -</p>
                    <p ref={secondText}>Fullstack Developer -</p>
                </div>
            </div>
            
        </main>
    )
}