import React, {useEffect} from 'react';
import FAQ from "../../component/movies-home/q&a/FAQ";
import Comments from "../../component/movies-home/Support/Comments";
import Assess from "../../component/movies-home/Assess/Assess";
const SupportPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <FAQ/>
            <Comments/>
            <Assess />
        </div>
    );
};

export default SupportPage;