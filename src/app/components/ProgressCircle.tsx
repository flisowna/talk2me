import React, { useState, useEffect, useRef } from "react";
interface ProgressCircleProps {
    totalQuestions: number;
    currentQuestionNumber: number;
  }

const ProgressCircle: React.FC<ProgressCircleProps> = ({
    totalQuestions,
    currentQuestionNumber,
  }) => {
  const [offset, setOffset] = useState(0);
  const circleRef = useRef<SVGCircleElement | null>(null); 

  const strokeWidth = 8;
  const size = 50;
  const center = size / 1;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressPercentage = (currentQuestionNumber / totalQuestions) * 100;
    const progressOffset = ((100 - progressPercentage) / 100) * circumference;
    setOffset(progressOffset);
    if (!circleRef.current) return;
    circleRef.current.style.transition = "stroke-dashoffset 0.5s ease-in-out";
  }, [totalQuestions, currentQuestionNumber, circumference]);

  return (
    <div className="relative inline-block">
      <svg className='md:h-24 h-10 md:w-24 w-10'>
        <circle
          className="opacity-10 fill-none relative"
          style={{ stroke: "#1C9B9A" }}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        ></circle>
        <circle
          className="fill-none"
          style={{ stroke: "#1C9B9A" }}
          ref={circleRef}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`} // Note the use of template literal
        ></circle>
        
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 absolute top-10 left-10"
        >
        <path
          d="M21.9626 14.3707C21.7686 13.8907 21.2221 13.6587 20.7421 13.8529C20.262 14.047 20.0302 14.5934 20.2243 15.0734L21.3284 17.8046L18.0491 16.3591C17.8118 16.2544 17.5416 16.2528 17.303 16.3546C16.1823 16.8328 14.9818 17.0752 13.7347 17.0752C8.71568 17.0752 5.34411 13.1455 5.34411 9.47511C5.34411 5.2844 9.10812 1.875 13.7347 1.875C18.3613 1.875 22.1253 5.2844 22.1253 9.47511C22.1253 9.80206 22.0949 10.1936 22.0418 10.5492C21.9654 11.0613 22.3186 11.5383 22.8307 11.6147C23.3429 11.6913 23.8199 11.3379 23.8963 10.8258C23.9634 10.3763 24.0003 9.89656 24.0003 9.47511C24.0003 6.92839 22.9219 4.5388 20.9636 2.74654C19.0285 0.97542 16.4612 0 13.7347 0C11.0082 0 8.44094 0.97542 6.50581 2.74649C4.75587 4.34812 3.70925 6.42693 3.50624 8.66844C1.30513 10.1261 0.00036695 12.4618 0.00036695 14.9777C0.00036695 16.5493 0.495507 18.0405 1.43802 19.3238L0.0687106 22.7111C-0.0743048 23.0648 0.0113357 23.4699 0.28532 23.7355C0.463866 23.9087 0.699131 24 0.938053 24C1.06569 24 1.19441 23.9739 1.31601 23.9203L5.26423 22.1798C6.25742 22.5496 7.30727 22.7367 8.39093 22.7367C8.41437 22.7367 8.43738 22.7349 8.4604 22.7332C10.0278 22.7213 11.5515 22.3091 12.8712 21.5376C14.0533 20.8464 15.0257 19.897 15.7074 18.7758C16.373 18.6563 17.0235 18.4757 17.6549 18.2344L22.6846 20.4516C22.8063 20.5051 22.9349 20.5313 23.0626 20.5313C23.3015 20.5312 23.5368 20.4399 23.7154 20.2668C23.9894 20.0012 24.075 19.5961 23.932 19.2423L21.9626 14.3707ZM8.39102 20.8593C8.37823 20.8593 8.36576 20.8607 8.35305 20.8613C7.39577 20.8564 6.4744 20.6682 5.61392 20.3011C5.37537 20.1992 5.10523 20.2009 4.86786 20.3056L2.67238 21.2733L3.38061 19.5214C3.51153 19.1975 3.45149 18.8277 3.22489 18.5619C2.342 17.5261 1.87536 16.2867 1.87536 14.9777C1.87536 13.4795 2.5056 12.06 3.60828 10.9837C3.95159 12.8552 4.92026 14.6454 6.3815 16.0518C8.19982 17.8017 10.605 18.8155 13.2021 18.9376C11.9828 20.1378 10.2379 20.8593 8.39102 20.8593Z"
          fill="#1C9B9A"
        />
        <path
          d="M13.6875 10.4531C14.2053 10.4531 14.625 10.0334 14.625 9.51562C14.625 8.99786 14.2053 8.57812 13.6875 8.57812C13.1698 8.57812 12.75 8.99786 12.75 9.51562C12.75 10.0334 13.1698 10.4531 13.6875 10.4531Z"
          fill="#1C9B9A"
        />
        <path
          d="M17.4375 10.4531C17.9553 10.4531 18.375 10.0334 18.375 9.51562C18.375 8.99786 17.9553 8.57812 17.4375 8.57812C16.9198 8.57812 16.5 8.99786 16.5 9.51562C16.5 10.0334 16.9198 10.4531 17.4375 10.4531Z"
          fill="#1C9B9A"
        />
        <path
          d="M9.93756 10.4531C10.4553 10.4531 10.8751 10.0334 10.8751 9.51562C10.8751 8.99786 10.4553 8.57812 9.93756 8.57812C9.41979 8.57812 9.00006 8.99786 9.00006 9.51562C9.00006 10.0334 9.41979 10.4531 9.93756 10.4531Z"
          fill="#1C9B9A"
        />
        </svg>
    </div>
  );  
};

export default ProgressCircle;
