import React, {useEffect} from 'react';
import Comments from "../../component/Home/Support/Comments";
import Assess from "../../component/Home/Assess/Assess";
import {Main} from "../../layout/main/Main";
const SupportPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
    <Main content={
        <div className="py-20">
            <Comments/>
            <Assess />
        </div>
    }/>
    );
};

export default SupportPage;