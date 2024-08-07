import { Link, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import HomePosts from "../Components/HomePosts";
import Navbar from "../Components/Navbar";
import Loader from "../Components/Loader";
import api from '../utils/api';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loader, setLoader] = useState(false);
    const { search } = useLocation();
    const { user } = useContext(UserContext);

    const fetchPosts = async () => {
        setLoader(true);
        try {
            const res = await api.get('/posts/' + search);
            console.log(res.data);
            setPosts(res.data);
            if (res.data.length === 0) {
                setNoResults(true);
            } else {
                setNoResults(false);
            }
            setLoader(false);
        } catch (err) {
            console.log(err);
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [search]);

    return (
        <div>
            <Navbar />
            <div className="px-4 mb-4 md:px-[200px] min-h-[80vh]">
                {loader ? (
                    <div className="h-[40vh] flex justify-center items-center"><Loader /></div>
                ) : (
                    !noResults ? (
                        posts.map((post) => (
                            <div key={post._id}>
                                <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                                    <HomePosts post={post} />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <h3 className="text-center font-bold mt-16">No posts available</h3>
                    )
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Home;
