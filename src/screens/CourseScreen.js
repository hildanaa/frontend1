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
                                question: 'Which of the following is NOT a characteristic of a relational database management system (RDBMS)?',
                                options: [' Data is stored in tables','Tables can have relationships defined between them',
                 
                             "Data is stored in a hierarchical structure",
                                " Structured Query Language (SQL) is used to manipulate data"],
                                correctAnswer: 'Data is stored in a hierarchical structure',
                            },
                            {
                                question: 'Which of the following is NOT a primary key constraint in a relational database?',
                                options: [ "UNIQUE"
                                    , "FOREIGN KEY"
                                    , "NOT NULL"
                                    , "AUTO_INCREMENT"],
                                correctAnswer: "FOREIGN KEY",
                            },
                            {
                                question: 'In a relational database, which SQL command is used to retrieve data from a table?',
                                options: [ 'INSERT','UPDATE','SELECT','DELETE']
                                ,
                                correctAnswer: 'SELECT',
                            },
                            {
                                question: 'Which of the following is used to ensure data integrity in a relational database?',
                                options: ['Foreign keys', 'Primary keys', 'indexes', 'Triggers'],
                                correctAnswer: 'Triggers',
                            },
                            {
                                question: 'Which of the following best describes a database transaction?',
                                options: ['A single operation that retrieves data from a database',
                                     'A set of operations that are executed as a single unit',
                                     'A process of optimizing database performance',
                                     'A way to encrypt sensitive data stored in a database'],
                                correctAnswer: 'A way to encrypt sensitive data stored in a database',
                            },
                        ]} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default CourseScreen