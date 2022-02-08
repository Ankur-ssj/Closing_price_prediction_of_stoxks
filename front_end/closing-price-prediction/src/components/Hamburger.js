import React, {useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import gsap from 'gsap'
import '../scss/hambuger.css'

const Hamburger = ({state}) => {

    let menu= useRef(null)
    let revealMenu= useRef(null)
    let revealMenuBackground= useRef(null)

    useEffect(() =>{
        if (state.clicked === false) {
            //close our menu
            gsap.to([revealMenu, revealMenuBackground], {
                duration:0.8,
                height:0,
                ease:"power3.inOut",
                stagger: {
                    amount: 0.07
                }
            });
            gsap.to(menu,{
                duration: 1,
                css: { display: "none"}
            })
        }
        else if (
            state.clicked === true || 
            (state.clicked === true && state.initial === null)
        ){
            //open our menu
            gsap.to(menu,{
                duration: 1,
                css: { display: "block"}
            });
            gsap.to([revealMenuBackground,revealMenu], {
                duration: 0,
                opacity: 1,
                height:"100%"
            });
            staggerReveal(revealMenuBackground,revealMenu);
/*             staggerText(line1,line2);
            staggerText1(line4, line5, line6); */
        }
    }, [state]);

    const staggerReveal = (node1, node2) => {
        gsap.from([node1, node2], {
            duration: 0.8,
            height: 0,
            transformOrigin: "right-top",
            skewY : 2,
            ease: "power3.inOut",
            stagger: {
                amount: 0.1
            }
        })
    }
    
/*     const staggerText = (nodea, nodeb) => {
        gsap.from([nodea, nodeb], {
            duration: 0.8,
            y: 100,
            deplay: 0.2,
            ease: "power3.inOut",
            stagger: {
                amount: 0.6
            }
        })
    } */
    // Hover on the link
    const imgHover = e => {
        gsap.to(e.target, {
          duration: 0.3,
          y: 9,
          x: 5,
          ease: "power1.inOut"
        });
      };

        // Hover off the link
  const imgHoverExit = e => {
    gsap.to(e.target, {
      duration: 0.3,
      y: -5,
      x: 3,
      ease: "power1.inOut"
    });
  };

    // Hover on the link
    const handleHover = e => {
    gsap.to(e.target, {
      duration: 0.3,
      y: 3,
      skewX: 4,
      ease: "power1.inOut"
    });
  };
  
  // Hover off the link
  const handleHoverExit = e => {
    gsap.to(e.target, {
      duration: 0.3,
      y: -3,
      skewX: 0,
      ease: "power1.inOut"
    });
  };

    return (
        <div ref={el => (menu = el) } className="hamburger-menu">
            <div ref={el => (revealMenuBackground = el) } className="menu-secondary-background-color"></div>
            <div ref={el => (revealMenu = el) } className="menu-layer"></div>
            <div className="hamburger-container">
                <div className="hamburger-wrapper">
                    <div className="menu-links">
                        <nav className="nav">
                        <div className="row">
                            <div className="section1 col-xs-12 col-md-4 col-lg-4 col-xl-4">
                                <Link onMouseEnter={e => handleHover(e)} onMouseLeave={e => handleHoverExit(e)} className="home" to="/">Home</Link>
                                <Link onMouseEnter={e => handleHover(e)} onMouseLeave={e => handleHoverExit(e)} className="google" to="/Results">GOOG</Link>
                                <Link onMouseEnter={e => handleHover(e)} onMouseLeave={e => handleHoverExit(e)} className="apple" to="/Apple">AAPL</Link>
                                <Link onMouseEnter={e => handleHover(e)} onMouseLeave={e => handleHoverExit(e)} className="tesla" to="/Results">TESLA</Link>
                            </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hamburger
