




const blogsContainerEl = document.querySelector('div.blogs')



// in case print means creating an element to the dom and inserting the values in it
const printBlog = (body) =>{
    let mainText = (body.body.length > 200) ?  body.body.substring(0,200) + "..." : body.body
    const blog = `
                <div class="blog" data-id='${body.id}'>
                    <div class="title">
                        ${body.title}
                    </div>
                    <div class="main">
                        ${mainText}
                    </div>
                    <div class="date">${body.date}</div>
                    <hr >
                    <div class="actions">
                        <div class="btn show">See</div>
                        <div class="btn del">Delete</div>
                        <div class="btn like">Like&nbsp;<span class='likes'>${body.likes}</span></div>
                    </div>
                </div>
    `

    blogsContainerEl.innerHTML += blog
}



fetch('http://localhost:2001/api/blogs').then(res=>{return res.json()})
.then(data=>{
    data.map(e=>{
        printBlog(e)
    })
})



/* blog schema 
div.blog{
    div.title,
    hr,
    div.main,
    div.date,
    hr,
    div.actions{
        div.btn.show,
        div.btn.del,
        div.btn.like,
    }
}
 */