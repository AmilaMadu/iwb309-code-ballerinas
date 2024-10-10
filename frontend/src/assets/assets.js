import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import doc_pic from './doc_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Neurologist from './Neurologist.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    doc_pic
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Cardiologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Dilanka Fernando',
        image: assets.doc_pic,
        speciality: 'General physician',
       fees: 50,
    },
    {
        _id: 'doc3',
        name: 'Dr. Lakshman Amarasinghe',
        image: assets.doc_pic,
        speciality: 'Dermatologist',
        fees: 30,
    },
    {
        _id: 'doc5',
        name: 'Dr. Nalinda Athukorala',
        image: assets.doc_pic,
        speciality: 'Neurologist',
        fees: 50,
    },
    {
        _id: 'doc6',
        name: 'Dr. Nuwan Perera',
        image: assets.doc_pic,
        speciality: 'Cardiologist',
        fees: 50,
        
    },
    {
        _id: 'doc7',
        name: 'Dr. Tharindu Jayasekara',
        image: assets.doc_pic,
        speciality: 'General physician',
        fees: 50,
       
    },
    {
        _id: 'doc9',
        name: 'Dr. Prasanna Samarasinghe',
        image: assets.doc_pic,
        speciality: 'Dermatologist',
        fees: 30,
        
    },
    {
        _id: 'doc11',
        name: 'Dr. Mohan Siriwardana',
        image: assets.doc_pic,
        speciality: 'Neurologist',
        fees: 50,
      
    },
    {
        _id: 'doc12',
        name: 'Dr. Malini Rathnayaka',
        image: assets.doc_pic,
        speciality: 'Neurologist',
       fees: 50,
      
    },
    {
        _id: 'doc13',
        name: 'Dr. Tharanga Karunathilaka',
        image: assets.doc_pic,
        speciality: 'General physician',
       fees: 50,
       
    },
    {
        _id: 'doc15',
        name: 'Dr. Nalin Wijesinghe',
        image: assets.doc_pic,
        speciality: 'Dermatologist',
        fees: 30,
       
    },
]