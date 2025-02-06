// // import React, { useEffect, useState } from 'react'
// // import RatingStars from '../../common/RatingStars'
// // import GetAvgRating from '../../../utils/avgRating';
// // import { Link } from 'react-router-dom';

// // const Course_Card = ({course, Height}) => {

// //     const [avgReviewCount, setAvgReviewCount] = useState(0);

// //     useEffect(()=> {
// //         const count = GetAvgRating(course.ratingAndReviews);
// //         setAvgReviewCount(count);
// //     },[course])

// //   return (
// //     <>
// //       <Link to={`/courses/${course._id}`}>
// //         <div className="">
// //           <div className="rounded-lg">
// //             <img
// //               src={course?.thumbnail}
// //               alt="course thumnail"
// //               className={`${Height} w-full rounded-xl object-cover `}
// //             />
// //           </div>
// //           <div className="flex flex-col gap-2 px-1 py-3">
// //             <p className="text-xl text-black">{course?.courseName}</p>
// //             <p className="text-sm text-black">
// //               {course?.instructor?.firstName} {course?.instructor?.lastName}
// //             </p>
// //             <div className="flex items-center gap-2">
// //               <span className="text-yellow-5">{avgReviewCount || 0}</span>
// //               <RatingStars Review_Count={avgReviewCount} />
// //               <span className="text-black">
// //                 {course?.ratingAndReviews?.length} Ratings
// //               </span>
// //             </div>
// //             <p className="text-xl text-black">Rs. {course?.price}</p>
// //           </div>
// //         </div>
// //       </Link>
// //     </>
// //   )
// // }

// // export default Course_Card

// import React, { useEffect, useState } from "react";
// import RatingStars from "../../common/RatingStars";
// import GetAvgRating from "../../../utils/avgRating";
// import { Link } from "react-router-dom";

// const Course_Card = ({ course, Height }) => {
//   const [avgReviewCount, setAvgReviewCount] = useState(0);

//   useEffect(() => {
//     const count = GetAvgRating(course.ratingAndReviews);
//     setAvgReviewCount(count);
//   }, [course]);

//   return (
//     <>
//       <Link to={`/courses/${course._id}`}>
//         <div className="course-card">
//           <div className="rounded-lg">
//             <img
//               src={course?.thumbnail}
//               alt="course thumbnail"
//               className={`${Height} w-full rounded-xl object-cover`}
//               loading="lazy" // Adding lazy loading to images
//             />
//           </div>
//           <div className="flex flex-col gap-2 px-1 py-3">
//             <p className="text-xl text-black">{course?.courseName}</p>
//             <p className="text-sm text-black">
//               {course?.instructor?.firstName} {course?.instructor?.lastName}
//             </p>
//             <div className="flex items-center gap-2">
//               <span className="text-yellow-500">{avgReviewCount || 0}</span>
//               <RatingStars Review_Count={avgReviewCount} />
//               <span className="text-black">
//                 {course?.ratingAndReviews?.length} Ratings
//               </span>
//             </div>
//             <p className="text-xl text-black">Rs. {course?.price}</p>
//           </div>
//         </div>
//       </Link>
//     </>
//   );
// };

// export default Course_Card;

// shifted the text to the left
import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
import { Link } from "react-router-dom";

const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="course-card text-left">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} w-full rounded-xl object-cover`}
              loading="lazy" // Adding lazy loading to images
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3 text-left">
            <p className="text-xl text-black">{course?.courseName}</p>
            <p className="text-sm text-black">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-black">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-black">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Course_Card;
