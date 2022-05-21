import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SecuritiesController {
    async  login({ view }:HttpContextContract) {
        return view.render('auth/login')
    }
    async auth({request,auth,response,session }:HttpContextContract){
        const email=request.input('email')
        const password=request.input('password')
        try{
            await auth.use('web').attempt(email,password)
            response.redirect('/')
        }catch{
            session.flash({error:'identifiant incorrect'})
            response.redirect().toRoute('login')

        }
    }

}
