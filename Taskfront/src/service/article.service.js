const getAll = () => {
    return fetch("http://localhost:3333/articles")
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw "something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}
const getOne = (article_id) => {
    return fetch("http://localhost:3333/articles/" + article_id)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw "something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}


const deleteOne = (article_id) => {
    return fetch("http://localhost:3333/articles/" + article_id,
        {

            method: 'DELETE',
            headers: {
                "X-Authorization": localStorage.getItem("session_token"),
                "content-type": "application/json"
            },


        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                throw "here"

            } else {
                throw "something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)

        })
}

const updateOne = async (article_id, article_text, title, author) => {
   
      return fetch("http://localhost:3333/articles/" + article_id,
            {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": localStorage.getItem("session_token")
                },
                body: JSON.stringify({
                    "title": title,
                     "author": author,
                    "article_text": article_text,
                })
            })

            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                
                } else if (response.status === 400) {
                    throw "cannot updated article"
                } else {
                    throw response.statusText;
                }
            })
            .then((resJson) => {
                return resJson;
            })
            .catch((error) => {
                console.log("Err", error)
                return Promise.reject(error)
            })
    }
   

const postArticle = (title, author, article_text, ) => {
    return fetch("http://localhost:3333/articles/",
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")

            },
            body: JSON.stringify({
                "title": title,
                "author": author,
                "article_text": article_text,
               
            })
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
                
            } else if (response.status === 400) {
                throw "cannot post article"
            } else {
                throw response.statusText;
            }
        })
        .then((resJson) => {
            return resJson;
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}





export const articleService = {
    getAll,
    getOne,
    deleteOne,
    postArticle,
    updateOne
    
}
