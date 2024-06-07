import React from 'react'

function HomeScreen() {

    return (
        <>
            <div className="container col-xxl-8 px-4 py-5">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src="/lms.jpg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
                    </div>
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold lh-1 mb-3">East China University of Science and Technology</h1>
                        <p className="lead">Access some of the school's top courses taught by our top instructors.</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                         
                         <a href="https://www.ecust.edu.cn/en/main.psp">
                            <button type="button" id= "mybutton" className="btn btn-primary btn-lg px-4 me-md-2">Learn more</button>
                            </a>
                          
                            
                            {/* <button type="button" className="btn btn-outline-secondary btn-lg px-4">Default</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeScreen
