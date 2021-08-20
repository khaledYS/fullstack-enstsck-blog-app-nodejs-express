import express from 'express'
import { MongoClient } from "mongodb";
import cors from 'cors'



// the blogs 
const blogs = [
    {
        id: 1,
        title: 'how to play games....',
        body: 'playing games is so easy the most common way to play a game is just play......', 
        likes: 3422,
        date: Date()
    }, 
    {
        id: 2,
        title: 'tutorial for spelling tutorial ..',
        body: 'first thing you wanna do is how to spell it dumpass..',
        likes: 342,
        date: Date()
    }, 
    {
        id: 3,
        title: 'tutorial for spelling tutorial ..',
        body: 'first thing you wanna do is how to spell it dumpass..',
        likes: 348,
        date: Date()
    }
]

// initlizing the express app and define the port var
const app = express()
const PORT = process.env.PORT || 2001;



// some midlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
        origin: '*'
    })
)



// if you want to get all the blogs 
app.get('/api/blogs', (req, res)=>{
    res.status(200).json(blogs)
})


// if you want to get a specifec blog
app.get('/api/blog/:id', (req, res)=>{
    const { id } = req.params

    if(!id){
        res.status(400).send('id is required!!')
        return;
    }

    const blog = blogs.find(arrBlog=>arrBlog.id == id)

    if(!blog){
        res.status(400).send('the blog you are looking for is missign !!!')
        return;
    }

    res.json(blog)


})




// if you want to delete a specifec blog
app.delete('/api/blog/:id', (req,res)=>{
    const { id } = req.params

    if(!id){
        res.status(400).send('id is required!!')
        return;
    }

    let blogFind = blogs.find((val, ind)=>(val.id == id))

    if(!blogFind){res.status(400).send('sorry but the requsted blog is not any more exist'); return;}


    // deserves to mention that val stands for value and ind stands for index
    blogs.find((val, ind)=>{
        if(val.id == id ){
            blogs.splice(ind, 1)
            res.status(200).send('done..)')
        }
    })
    

})




// if you want to add a new blog
app.post('/api/blog', (req, res)=>{
    const { body } = req


    // basically checks if the content exist or not 
    if(!body.title){
        res.status(400).send('the title is required!!')
        return;
    }
    if(!body.main){
        res.status(400).send('the main is required!!')
        return;
    }
    if(!body.date){
        res.status(400).send('the date is required!!')
        return;
    }


    // simply here we creat the id var and check for the blogs if they are with length zero then the default value would be zero for the id if not then will take the last blog form blogs and plus into it id and its our id 
    let id;
    if(blogs.length <= 0 ){
        id = 1
    }else{
        id = blogs[blogs.length - 1].id + 1
    }


    const blog = {
        id : id, 
        main : body.main,
        date : body.date 
    }
    blogs.push(blog)

})




app.get('/test', (req, res)=>{
    console.log(blogs)
    res.status(200).json(blogs)
})



// if the user navigated into different url than the aobves then this will
// select the rest urls and git thim a 400 msg
app.get('*', (req, res) => {
    res.status(400).send(`The backend server running on ${PORT} port.......`)
})


app.listen(PORT || 3000, ()=>console.log(`The backend server running on ${PORT} port.......`))







/* 

data =await fetch('http://localhost:2001/api/blog/3', {
    "method": "get",
    "headers":{"Content-Type": "application/json"},
    "body": JSON.stringify({
    "title": " how to ", 
    "main" : "use me",
    "date" : Date()
})
}).then(res=>res.json()) */



// don't forget to remeber to handle requests comes get the blogs while there is no blog
// and also don't forget to search for " whats the different between Put and Patch "

/* 
    * if you wanna use this for your frontend do this
    * or use these urls
    * GET with 'http://localhost:2001/api/blogs' to get all the blogs
    * GET with 'http://localhost:2001/api/blog/:id' to get a specifec blog
    * POST with 'http://localhost:2001/api/blog/' to add a new blog      // cite ( 1 )
    * DELETE with 'http://localhost:2001/api/blog/:id' to delete a specifec post
    * //
    * cite ( 1 ){
    * the body object comes with the request to add a new post suppose to be like this 
    *   body{
    *       title: String,
    *       main : String,
    *       date: Date
    *   }
    * }
*/