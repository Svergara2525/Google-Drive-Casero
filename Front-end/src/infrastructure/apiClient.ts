import axios from 'axios';
import React from 'react';

const baseURL = "";

export const apliClient =  (() => {
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setPost(response.data);
        });
    }, []);

    if (!post) {
        return null;
    }

    
})