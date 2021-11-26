const fs = require("fs")
const url = require("url")
const http = require("http")


const replaceTemplate = (template, studentDetails) =>  {
    let output = template.replace(/{%ID%}/g ,studentDetails.id).replace(/{%NAME%}/g ,studentDetails.Name).replace(/{%JOB%}/g ,studentDetails.Job)
    return output
}

const studentPage = fs.readFileSync("C:\Users\RAGHURAM.G\OneDrive\Documents\projects\total Node JS\HTML--Templates-in-NODE-JS/index.html", "utf-8")
const singleStudent = fs.readFileSync("C:\Users\RAGHURAM.G\OneDrive\Documents\projects\total Node JS\HTML--Templates-in-NODE-JS/students.html","utf-8")
const data = fs.readFileSync("C:\Users\RAGHURAM.G\OneDrive\Documents\projects\total Node JS\HTML--Templates-in-NODE-JS/data.json","utf-8")
const studentData = JSON.parse(data)

const server = http.createServer((req,res)=>{
    const reqPath = req.url
    if(reqPath === '/login'){
        res.end("test")
    }
    else if (reqPath === '/students'){
        res.writeHead(200, {"content-type" : "text/html"})
        const studentCard = studentData.map(el => replaceTemplate(singleStudent, el)).join('')
        console.log(studentCard)
        const output = studentPage.replace(/{%STUDENTS_DATA%}/g , studentCard).replace(/{%TOTAL_COUNT%}/g, studentData.length)
        res.end(output)
    }
    else{
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-header' : 'my header'
        })
        res.end( "<h1>Page not found</h1>")
    }
    
})

server.listen(8000, '127.0.0.1', () => {
    console.log("listening on port 8000")
})