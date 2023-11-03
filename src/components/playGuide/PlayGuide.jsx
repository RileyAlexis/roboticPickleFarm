import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PlayGuide.css';
import { Typography } from '@mui/material';

import ArrowIcon from './ArrowIcon.svg';

function PlayGuide() {

    const [playSteps, setPlaySteps] = useState(0)
    const playGuide = useSelector(store => store.stats.playGuide); //Tutorial is turned on or off via the redux stats reducer
    const dispatch = useDispatch();

    const completeStep = (index) => {
        setPlaySteps(index + 1);
        console.log(playSteps);
    }

    const closeGuide = () => {
        dispatch({ type: 'stats/toggleActive', payload: { title: 'playGuide' } });
    }

    return (
        <div className="guideContainer">
            {/* ------------------------ STEP ONE ------------------------- */}
            {playSteps === 0 &&
                <div className="stepOne">
                    <div className="stepOneArrow">
                        <img src={ArrowIcon} />
                    </div>
                    <div className="stepOneBox">
                        <Typography variant='body'>
                            This section of the screen displays the overall goal of the game: to make 2.8 trillion pickles.
                            Below is the progress bar(it won't show much progress at first) and below that is the number of years
                            it will take to reach the goal at your current production rate(yes, that's 29 billion years).
                        </Typography>
                        <div className="stepButton">
                            <button className={`closeButton`} onClick={closeGuide}>
                                <Typography variant='h5'>
                                    Close Guide
                                </Typography>
                            </button>
                            <button className={`closeButton`} onClick={() => completeStep(0)}>
                                <Typography variant='h5'>
                                    Next
                                </Typography>
                            </button>
                        </div>
                    </div>
                </div>
            }
            {/* ------------------------ END STEP ------------------------- */}

            {/* ------------------------ STEP Two ------------------------- */}
            {playSteps === 1 &&

                <div className="stepTwo">
                    {console.log('Step Two')}
                    <div className="stepTwoArrow">
                        <img src={ArrowIcon} />
                    </div>
                    <div className="stepTwoBox">
                        <Typography variant='body'>
                            This is the Game Menu where you can modify the game settings(such as running at 2x speed) or setting the
                            autosave interval(the default is 2 minutes). Signing out will autometically save your game before logging you out.
                        </Typography>
                        <div className="stepButton">
                            <button className={`closeButton`} onClick={closeGuide}>
                                <Typography variant='h5'>
                                    Close Guide
                                </Typography>
                            </button>
                            <button className={`closeButton`} onClick={() => completeStep(1)}>
                                <Typography variant='h5'>
                                    Next
                                </Typography>
                            </button>
                        </div>
                    </div>
                </div>
            }
            {/* ------------------------ END STEP ------------------------- */}

            {/* ------------------------ STEP Three ------------------------- */}
            {playSteps === 2 &&

                <div className="stepThree">
                    {console.log('Step Three')}
                    <div className="stepThreeArrow">
                        <img src={ArrowIcon} />
                    </div>
                    <div className="stepThreeBox">
                        <Typography variant='body'>
                            This tracks your total pickle production over the course of the game
                        </Typography>
                        <div className="stepButton">
                            <button className={`closeButton`} onClick={closeGuide}>
                                <Typography variant='h5'>
                                    Close Guide
                                </Typography>
                            </button>
                            <button className={`closeButton`} onClick={() => completeStep(2)}>
                                <Typography variant='h5'>
                                    Next
                                </Typography>
                            </button>
                        </div>
                    </div>
                </div>
            }
            {/* ------------------------ END STEP ------------------------- */}

            {/* ------------------------ STEP Four ------------------------- */}
            {playSteps === 3 &&

                <div className="stepFour">
                    <div className="stepFourArrow">
                        <img src={ArrowIcon} />
                    </div>
                    <div className="stepFourBox">
                        <Typography variant='body'>
                            This screen shows your resources. Seeds may be planted to create a new plant. Cucumbers are
                            waiting to be pickled and the pickles are your current pickles on hand. You can use these pickles to purchase items
                            in the game. The number in parenthesis will show your +/- trend over a 30 second time period. This time period can
                            be adjusted in the Settings menu.
                        </Typography>
                        <div className="stepButton">
                            <button className={`closeButton`} onClick={closeGuide}>
                                <Typography variant='h5'>
                                    Close Guide
                                </Typography>
                            </button>
                            <button className={`closeButton`} onClick={() => completeStep(3)}>
                                <Typography variant='h5'>
                                    Next
                                </Typography>
                            </button>
                        </div>
                    </div>
                </div>
            }
            {/* ------------------------ END STEP ------------------------- */}
            {/* ------------------------ STEP Five ------------------------- */}
            {playSteps === 4 &&

                <div className="stepFive">
                    <div className="stepFiveArrow">
                        <img src={ArrowIcon} />
                    </div>
                    <div className="stepFiveBox">
                        <Typography variant='body'>
                            This screen shows your plants. Plants grow cucumbers, once those cucumbers are ripe
                            they can be picked, either manually by clicking a button or by robots(once you've purchased them).
                            Each second a plant has a small chance of producing a plantable seed, this chance can be increased with
                            upgrades. Plants can only hold so many cucumbers at a time, if you don't pick them plants will stop growing.
                        </Typography>
                        <div className="stepButton">
                            <button className={`closeButton`} onClick={closeGuide}>
                                <Typography variant='h5'>
                                    Close Guide
                                </Typography>
                            </button>
                            <button className={`closeButton`} onClick={() => completeStep(4)}>
                                <Typography variant='h5'>
                                    Next
                                </Typography>
                            </button>
                        </div>
                    </div>
                </div>
            }
            {/* ------------------------ END STEP ------------------------- */}
            {/* ------------------------ STEP Six ------------------------- */}
            {playSteps === 5 &&

                <div className="stepSix">
                    <div className="stepSixArrow">
                        <img src={ArrowIcon} />
                    </div>
                    <div className="stepSixBox">
                        <Typography variant='body'>
                            Once you purchase a robot(100 pickles) it will begin performing its job at a rate of 1 per second. Robots can be upgraded
                            to run faster.
                        </Typography>
                        <div className="stepButton">
                            <button className={`closeButton`} onClick={closeGuide}>
                                <Typography variant='h5'>
                                    Close Guide
                                </Typography>
                            </button>
                            <button className={`closeButton`} onClick={() => completeStep(5)}>
                                <Typography variant='h5'>
                                    Next
                                </Typography>
                            </button>
                        </div>
                    </div>
                </div>
            }
            {/* ------------------------ END STEP ------------------------- */}
            {/* ------------------------ STEP Seven ------------------------- */}
            {playSteps === 6 &&

                <div className="stepSeven">
                    <div className="stepSevenBox">
                        <Typography variant='body'>
                            As you produce pickles additional options will become available such as Robots, Upgrades and Buldings. These
                            items will help you automate the game and reach that 2.8 trillion pickle goal long before the heat death of the universe.
                        </Typography>
                        <div className="stepButton">
                            <button className={`closeButton`} onClick={closeGuide}>
                                <Typography variant='h5'>
                                    Close Guide
                                </Typography>
                            </button>


                        </div>
                    </div>
                </div>
            }
            {/* ------------------------ END STEP ------------------------- */}



        </div>
    )
}

export default PlayGuide;