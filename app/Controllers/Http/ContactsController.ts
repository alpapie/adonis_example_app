import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ContactService } from 'App/services/ContactService'

export default class ContactsController {
    async contact({view }: HttpContextContract) {

        return view.render('contact')
    }

    async store({request,session,response}:HttpContextContract){
        ContactService.send(request.all() as any)
        session.flash('succes','votre demande de contact a bien etee enregistrer')
        return response.redirect().back()
    }
}
