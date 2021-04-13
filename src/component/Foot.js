import React from 'react';

function Foot(){

    return (

     <footer className="text-secondary page-footer font-small">
        <hr class="clearfix mt-4 w-100"/>
         <div className="container text-md-left text-center">
             <div className="row">


                 <div className="col-md-3 mx-auto">

                <h5 className="text-primary">Text Good</h5>
                <ul className="list-unstyled">
                    <li>Here is some good text to ponder. Points to ponder. Ok this is demo text</li>
                </ul>

                 </div>

                 <div className="col-md-3 mx-auto">

                <h5 className="text-primary">Alliance</h5>
                <ul className="list-unstyled">
                        <li>Aim High</li>
                        <li className="text-primary">Sky Dive</li>
                        <li >Always say I </li>
                        <li className="text-primary">have no fear</li>
                </ul>

                </div>

                <div className="col-md-3 mx-auto">

                <h5 className="text-primary">Useful Links</h5>
                <ul className="list-unstyled">
                    <li>link 1</li>
                    <li className="text-primary">link 2</li>
                    <li>link 3</li>
                    <li className="text-primary">link 4</li>
                </ul>

                </div>


             </div>
         </div>

         <div className="footer-copyright text-center py-3">
         &#169; 2021, photosfire
         </div>

     </footer>

    )
}

export default Foot;