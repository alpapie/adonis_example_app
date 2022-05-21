
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Category from 'App/Models/Category';

import {string} from '@ioc:Adonis/Core/Helpers'
import Drive from '@ioc:Adonis/Core/Drive'

import Post from "App/Models/Post";
import User from "App/Models/User";

import UpdateDostValidator from 'App/Validators/UpdateDostValidator';


export default class BlogsController {

    async index({ view,request }:HttpContextContract){
       if (request.input('create')=='oui') {
         const user= User.create(
            {
               email:'alpapie0908@gmail.com',
               password:'alpapie1998'
            }
         )
       }
     
      //   const posts=await Post.all()
        const page=request.input('page',1)
        const posts=await Database.from(Post.table).paginate(page,5)

        return view.render('Blogs/index',{posts})
    //     return data
     }

      async create({view}:HttpContextContract){
         const post= new Post()
         const categories= await Category.all()
         return view.render('Blogs/create',{post,categories})

      }

      async store({params,request,response,session}:HttpContextContract) {

            // const post=  new Post()
            // const data= await request.validate(UpdateDostValidator)
         
            // post 
            //    .merge({...data, online:data.online || false})
            //    .save();
            this.handlerRequest(params,request)
            session.flash({success: "l'article a bien ete crée"})
            return response.redirect().toRoute('home')
      }

     async show({ params,view ,bouncer}:HttpContextContract){

      const post=await Post.findOrFail(params.id)
      await bouncer.authorize('editpost',post)
      const categories= await Category.all()
      //const post =await Post.query().preload('category').where('id',params.id).firstOrFail()
        return view.render('Blogs/show',{post,categories})
     }

     async update({params, request,response,session,bouncer}:HttpContextContract){
      // const post=   await Post.findOrFail(params.id)
      // // if(bouncer){
      // //    await bouncer.authorize('editpost',post)
      // // }
      // // const data= await request.validate(UpdateDostValidator)
      
      // //    post .merge({...data, online:data.online || false})
      // //     .save();
      this.handlerRequest(params,request,bouncer)
        session.flash({success: "l'article a bien ete sauvegarde"})
        return response.redirect().toRoute('home')
     }

     async destroy({ params,session,response }:HttpContextContract){

      const post=await Post.findOrFail(params.id)
      post.delete()
      
      session.flash({success: "l'article a été supprime"})
      return response.redirect().toRoute('home')
       
   }
   
     private async handlerRequest(params: HttpContextContract['params'],request:HttpContextContract['request'],bouncer?:HttpContextContract['bouncer']){
        
        const post= params.id ? await Post.findOrFail(params.id) : new Post()
       

        if(bouncer){
         await bouncer.authorize('editpost',post)
         }
          const thumbnail=request.file('thumbnailFile')
         const data= await request.validate(UpdateDostValidator)
        
         if(thumbnail){
            if (post.thumbnail) {
               await Drive.delete(post.thumbnail)
               
            }
            const newName= string.generateRandom(32)+'.'+thumbnail?.extname
            await thumbnail?.moveToDisk('./',{name:newName})
            post.thumbnail=newName
         }
      post .merge({title: data.title,content :data.content,categoryId: data.categoryId, online:data.online || false})
            .save();
    
     }
        
}
    


