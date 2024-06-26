import { useEffect } from 'react';
import ArrowIcon from '../../commons/ArrowIcon';
import Steps from '../../steps/Steps';

import './mainPage.css';


function MainPage(): JSX.Element {
    useEffect(() => {
        
        const header:HTMLElement | null = document.querySelector("header");
        const heroText: HTMLElement | null = document.querySelector(".hero_description");
        const heroBG1: HTMLElement | null = document.querySelector(".bg-layer-1 img");
        const heroBG4: HTMLElement | null = document.querySelector(".bg-layer-4 img");
    
        window.addEventListener("scroll", () => {
            let value = window.scrollY;
            if (value > 1100) {
                value = 0;
            }
            header !== null ? header.style.top = `${value / 1.08}px` : '';
            if (value > 350) {
                if (header) header.style.top = '0';
            }
            heroBG1 !== null ? heroBG1.style.top = `-${value / 3}px` : '';
            heroBG4 !== null ? heroBG4.style.top = `${value / 8}px` : '';
            heroBG4 !== null ? heroBG4.style.left = `-${value / 5.5}px` : '';
            heroText !== null ? heroText.style.transform = `translateY(${value / 1.5}px)` : '';
        });
    }, [])

    return (
        <>
            <section className="hero" id="hero">
                <div className="bg-layer-1 HG"><img src="https://res.cloudinary.com/coderabbi/image/upload/v1641892210/MNTN--figma/bg-layer-1_e7t1bk.png" alt="Background" /></div>
                <div className="bg-layer-2 BG Hero"></div>
                <div className="bg-layer-3 MG"><img src="https://res.cloudinary.com/coderabbi/image/upload/v1641892219/MNTN--figma/bg-layer-3_xvue3k.png" alt="Background" /></div>
                <div className="bg-layer-4 VG"><img src="https://trueimages.ru/img/81/77/3ab71766.png" alt="Background" /></div>
                <div className="hero_description">
                    <h1>ДАВАЙ ЗНАКОМИТЬСЯ?</h1>
                    <p className="hero_post-text">
                        <span className="scroll-text">крути колесо мыши вниз, и пройди 3 простых шага</span>
                        <span className="scroll-icon">
                            <ArrowIcon/>
                        </span>
                    </p>
                </div>
                <div className="height"></div>
            </section>
            <Steps />
        </>);
}

export default MainPage;



