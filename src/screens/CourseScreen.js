import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getCourseDetail } from '../actions/sharedActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import RichTextRenderer from '../components/RichTextRenderer'
import { BASE_URL } from '../constants/global'
import ReactPlayer from 'react-player'
import QuizQuestion from '../components/QuizQuestion'

const CourseScreen = () => {
    const params = useParams()
    const courseId = params.id

    const [activeIndex, setActiveIndex] = useState(null);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCourseDetail(courseId))
    }, [dispatch, courseId])

    const courseDetail = useSelector((state) => state.courseDetail)
    const { loading, error, course } = courseDetail

    const handleAccordionClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className='container'>
            <ul className="nav nav-tabs" id="myTabs" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active me-2" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">Content</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link me-2" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">Videos</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link me-2" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3" aria-selected="false">Documents / Files</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link me-2" id="tab4-tab" data-bs-toggle="tab" data-bs-target="#tab4" type="button" role="tab" aria-controls="tab4" aria-selected="false">Quiz</button>
                </li>
            </ul>

            <div className='m-2'>
                {loading && <Loader />}
            </div>

            <div className='m-2'>
                {error &&
                    <Message variant='danger'>{error}</Message>}
            </div>

            {loading === false && course != null > 0 && (
                <div className="tab-content my-4" id="myTabsContent">
                    <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>

                        {course?.course_chapters?.length == 0 && <h6>No Course Chapter Found</h6>}
                        {course?.course_chapters?.map((course_chapter) => (
                            <div className='card card-body'>
                                <h5>{course_chapter.title}</h5>
                                <p>{course_chapter.description}</p>

                                <div id="accordion">
                                    {course_chapter?.sections?.length == 0 && <h6>No Section Found</h6>}
                                    {course_chapter?.sections?.map((section) => (
                                        <div className="card">
                                            <div className="card-header" id={`heading${section.section_id}`}>
                                                <h5 className="mb-0">
                                                    <button
                                                        className="btn btn-link"
                                                        onClick={() => handleAccordionClick(1)}
                                                        aria-expanded={activeIndex === 1}
                                                        aria-controls="collapseOne"
                                                    >
                                                        {section.title}
                                                    </button>
                                                </h5>
                                            </div>
                                            <div
                                                id="collapseOne"
                                                className={`collapse ${activeIndex === 1 ? 'show' : ''}`}
                                                aria-labelledby={`heading${section.section_id}`}
                                                data-parent="#accordion"
                                            >
                                                <div className="card-body">
                                                    <RichTextRenderer content={section.content} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>

                        <h4>Videos</h4>

                        {course?.videos?.length == 0 && <h6>No Videos Found</h6>}
                        {course?.videos?.map((video) => (
                            <div className='card card-body'>
                                <h6>{video.title}</h6>
                                <ReactPlayer
                                    url={`${BASE_URL}${video?.path}`}
                                    controls
                                    width="640px"
                                    height="360px"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>

                        <h4>Documents / Files</h4>

                        {course?.files?.length == 0 && <h6>No Files Found</h6>}
                        {course?.files?.map((file) => (
                            <div className='card card-body'>
                                <a href={`${BASE_URL}${file?.path}`} download target="_blank" rel="noopener noreferrer">{file.title}</a>
                            </div>
                        ))}
                    </div>

                    <div className="tab-pane fade" id="tab4" role="tabpanel" aria-labelledby="tab4-tab">
                        <h3>{course?.title}</h3>
                        <p>{course?.description}</p>

                        <h4>Quiz</h4>

                        <QuizQuestion questions={[
                            {
                                question: 'What is the capital of France?',
                                options: ['Paris', 'London', 'Berlin', 'Rome'],
                                correctAnswer: 'Paris',
                            },
                            {
                                question: 'Which planet is known as the Red Planet?',
                                options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
                                correctAnswer: 'Mars',
                            },
                            {
                                question: 'Who painted the Mona Lisa?',
                                options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
                                correctAnswer: 'Leonardo da Vinci',
                            },
                            {
                                question: 'What is the tallest mountain in the world?',
                                options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
                                correctAnswer: 'Mount Everest',
                            },
                            {
                                question: 'Which animal is known as the "King of the Jungle"?',
                                options: ['Lion', 'Tiger', 'Leopard', 'Cheetah'],
                                correctAnswer: 'Lion',
                            },
                        ]} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default CourseScreen