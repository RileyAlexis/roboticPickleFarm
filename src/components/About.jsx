
function About({ onClose }) {
    return (
        <div class="modal fade" id="aboutModal" tabIndex="-1">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">About Robotic Pickle Farm</h5>
                <button type="button" class="btn-close" onClick={onClose} data-bs-dismiss="modal" aria-label='Close'></button>
            </div>
            <div class="modal-body">
                Robotic Pickle Farm is an incremental/clicker
                game created by Riley Alexis as her first web dev project.
                The game is in the spirit of Universal Paperclips, A Dark Room or
                Kittens Game. It involves an iterative game style where a player's
                goal is to make as many pickles as possible.
                The eventual goal is to produce 2.8 trillion pickles, roughly
                equal to the annual global output of planet Earth.
                <br />
                Robotic Pickle Farm is created using React, Redux, Redux-Saga,
                Node, Express and Postgres. User sessions handled by JSON Web
                Token and Bcrypt.
                </div>
            <div class="modal-footer">
                Source Code:  <a href="https://github.com/RileyAlexis/roboticPickleFarm">GitHub: Robotic Pickle Farm</a>
            </div>
            </div>
            </div>
        </div>
    )
}

export default About;