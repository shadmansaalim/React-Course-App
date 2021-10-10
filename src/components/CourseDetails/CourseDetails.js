import React from 'react';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import useCourses from '../../hooks/useCourses';
import { useState } from 'react';
import YouTube from 'react-youtube';
import { Container } from 'react-bootstrap';


const CourseDetails = () => {
    const { courseID } = useParams();
    // Getting courses from custom hook
    const [courses] = useCourses();
    const [selectedCourse, setSelectedCourse] = useState(null);
    // const [videoID, setVideoID] = useState('');


    //Setting the selected course every time by comparing with the courseID and also giving a dependency courses so that whenever courses changes selectedCourse also gets updated.
    useEffect(() => {
        setSelectedCourse(courses.find(c => parseInt(c.courseID) === parseInt(courseID)));
        // selectedCourse && setVideoID((selectedCourse?.video).substring(17));
    }, [courses]);

    const opts = {
        height: '250',
        width: '500',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };



    return (
        <div className="bg-dark text-white py-5">
            <Container>
                {
                    selectedCourse && <section>
                        <section className="row mb-5 d-flex mt-5">
                            <div className="col-lg-6 mx-auto">
                                <YouTube className="w-100" videoId={selectedCourse.video}>

                                </YouTube>
                            </div>
                            <div className="col-lg-5 mx-auto text-start mt-0">
                                <h3>{selectedCourse.name}</h3>
                                <p className="mb-2">{selectedCourse.tagline}</p>
                                <small>
                                    <b>4.5</b>
                                    <Rating
                                        className="mx-1"
                                        initialRating={selectedCourse.rating}
                                        emptySymbol="far fa-star icon-color"
                                        fullSymbol="fas fa-star icon-color"
                                        readonly
                                    ></Rating>
                                    ({selectedCourse.peopleRated})
                                </small>
                                <br />
                                <small>Created by <a href="!#">{selectedCourse.instructor}</a></small>
                                <br />
                                <button className="btn text-white mt-3" style={{ backgroundColor: 'rgb(69, 82, 110)' }}>Buy Course</button>
                            </div>

                        </section>
                        <section className="mb-4 col-9 mx-auto">
                            <p className="text-align-justify">
                                {selectedCourse.description}
                            </p>
                        </section>
                        <section className="mb-4 d-flex align-items-center flex-wrap justify-content-center">
                            <div className="shadow-lg p-5 rounded-3 me-5 bg-success">
                                <h5>{selectedCourse.lectures}</h5>
                                <small>Lectures</small>
                            </div>
                            <div className="shadow-lg p-5 rounded-3 me-5 bg-success">
                                <h5>{selectedCourse.students}</h5>
                                <small>Students</small>
                            </div>
                            <div className="shadow-lg p-5 rounded-3 bg-success">
                                <h5>{selectedCourse.projects}</h5>
                                <small>Projects</small>
                            </div>
                        </section>


                    </section>
                }
            </Container>
        </div>
    );
};

export default CourseDetails;