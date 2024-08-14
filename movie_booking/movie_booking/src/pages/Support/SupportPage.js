import React, {useEffect} from 'react';
import FAQ from "../../component/Home/q&a/FAQ";
import Comments from "../../component/Home/Support/Comments";
import Assess from "../../component/Home/Assess/Assess";
import {Main} from "../../layout/main/Main";
const SupportPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
    <Main content={
        <div>
            <FAQ/>
            <Comments/>
            <Assess />
        </div>
    }/>
    );
};

export default SupportPage;