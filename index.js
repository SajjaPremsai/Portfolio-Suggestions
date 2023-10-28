const bodyParser = require("body-parser")
const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
const dotenv = require("dotenv").config()
const app = express()

app.use(bodyParser.json())
app.use(cors())

const Admin = nodemailer.createTransport({
    service:"gmail",
    host:"smpt.gmail.com",
    secure:false,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    tls : {
        rejectUnauthorized :false,
    }
})

app.post("/",(req,res)=>{
    let senderdetails = {
        from: {
            name: "Code_Demon__",
            address: process.env.EMAIL
        },
        to: "portfolio8938@gmail.com",
        subject: req.body.subject,
        text: req.body.text
    }

    Admin.sendMail(senderdetails, (err, success) => {
        if (err) {
            console.log(err)
            res.send("error at 1st suggestion")
        }
        else {
            console.log("Email Sent Successfully!")
            let ClientDetails = {
                from:{
                    name:"Code_Demon__",
                    address:process.env.EMAIL
                },
                to:req.body.email,
                subject:"Appreciation for Your Valuable Portfolio Suggestion",
                text: `Dear ${req.body.name},

I trust this message finds you well. I wanted to take a moment to express my sincere gratitude for your recent suggestion regarding my portfolio. Your feedback is truly valuable, and I appreciate the time you took to share your insights. I have carefully considered your suggestion and have already begun implementing the changes you recommended. Your thoughtful input has provided me with a fresh perspective on how I can enhance my portfolio and showcase my work more effectively. Your contribution will undoubtedly help me present my skills and accomplishments in a more compelling and impactful way. I am always open to constructive feedback and suggestions for improvement. If you have any more thoughts or ideas that you believe could further enhance my portfolio, please do not hesitate to share them with me. Your ongoing support and guidance are instrumental in helping me grow and develop as a professional. Once again, thank you for your valuable input and for being an integral part of my journey. I look forward to sharing my updated portfolio with you soon. 

Best regards, 
Code_Demon__.`
            }
            Admin.sendMail(ClientDetails,(err,success)=>{
                if(err) {
                    console.log(err)
                    res.send("error at client msg")
                }
                else {
                    console.log("Client Email Sent Successfully!")
                    res.send(true);
        }
            })
        }
    })
})


app.listen(process.env.PORT,()=>{
    console.log("Server running at port " + process.env.PORT)
})