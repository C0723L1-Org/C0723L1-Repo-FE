import React, { useEffect, useState } from 'react';

import {Main} from "../../layout/main/Main";
import SeeMovieDetails from "./SeeMovieDetails";

const PageDetail = () => {
    return (
        <Main content={
            <div>
                <SeeMovieDetails/>
            </div>
        }/>
    );
};

export default PageDetail;
