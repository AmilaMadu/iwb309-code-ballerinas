import header_img from './header_img.png'
import profile_pic from './profile_pic.png'
import doc_pic from './doc_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'

export const assets = {
    header_img,
    logo,
    profile_pic,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    doc_pic
}

export const specialityData = [
    {
        speciality: 'General physician',
    },
    {
        speciality: 'Dermatologist',
    },
    {
        speciality: 'Neurologist',
    },
    {
        speciality: 'Cardiologist',
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Dilanka Fernando',
        image: assets.doc_pic,
        speciality: 'General physician',
       fees: 4000,
    },
    {
        _id: 'doc3',
        name: 'Dr. Lakshman Amarasinghe',
        image: assets.doc_pic,
        speciality: 'Dermatologist',
        fees: 3500,
    },
    {
        _id: 'doc5',
        name: 'Dr. Nalinda Athukorala',
        image: assets.doc_pic,
        speciality: 'Neurologist',
        fees: 4000,
    },
    {
        _id: 'doc6',
        name: 'Dr. Nuwan Perera',
        image: assets.doc_pic,
        speciality: 'Cardiologist',
        fees: 3500,
        
    },
    {
        _id: 'doc7',
        name: 'Dr. Tharindu Jayasekara',
        image: assets.doc_pic,
        speciality: 'General physician',
        fees: 4000,
       
    },
    {
        _id: 'doc9',
        name: 'Dr. Prasanna Samarasinghe',
        image: assets.doc_pic,
        speciality: 'Dermatologist',
        fees: 4000,
        
    },
    {
        _id: 'doc11',
        name: 'Dr. Mohan Siriwardana',
        image: assets.doc_pic,
        speciality: 'Neurologist',
        fees: 3500,
      
    },
    {
        _id: 'doc12',
        name: 'Dr. Malini Rathnayaka',
        image: assets.doc_pic,
        speciality: 'Neurologist',
       fees: 4500,
      
    },
    {
        _id: 'doc13',
        name: 'Dr. Tharanga Karunathilaka',
        image: assets.doc_pic,
        speciality: 'General physician',
       fees: 3500,
       
    },
    {
        _id: 'doc15',
        name: 'Dr. Nalin Wijesinghe',
        image: assets.doc_pic,
        speciality: 'Dermatologist',
        fees: 3000,
       
    },
]