import {  useEffect, useState } from "react"
import { DataContext } from "../Contexts/DataContext"

export const DataProvider = ({ children }) => {

    const [subsData, setSubsData] = useState({
        id:null,
        name: "",
        cost: "",
        category: "",
        frequency: "",
        notes: "",
        paid: '',
        nextPaymentDate: "",
        file: null
    })

    const [subs, setSubs] = useState(()=>{
        const savSubs = localStorage.getItem('subscriptions');
        return savSubs ? JSON.parse(savSubs) : [];
    })
    const [errors, setErrors] = useState({})

    const handleRemove=(id)=>{
        const filtered = subs.filter((sub)=> sub.id !== id);
        setSubs([...filtered])
    }

    // Added: handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSubsData(prev => ({ ...prev, file }));
    }

    const handleViewFile = (file) => {
        if (!file) return;
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, "_blank");
        setTimeout(() => URL.revokeObjectURL(fileURL), 1000);
    };

    useEffect(() => {
        // console.log(subs);
        
        localStorage.setItem('subscriptions', JSON.stringify(subs));               
    }, [subs])
    

    const handleSubmit = (e) => {

        e.preventDefault();

        if (validateErrors()) {
            const newSub = {
                ...subsData, id: Math.floor(Math.random()*1000)
            }


            setSubs(prevState => [...prevState, newSub])



            setSubsData({
                name: "",
                cost: "",
                category: "",
                frequency: "",
                notes: "",
                paid: '',
                nextPaymentDate: "",
                file: null // reset file to null
            })
        }

    }

    const validateErrors = () => {
        const newError = {};

        if (!subsData.name) {
            newError.name = "Name is required"
        }
        if (!subsData.cost) {
            newError.cost = "Cost is required"
        }
        if (!subsData.category) {
            newError.category = "Category is required"
        }
        if (!subsData.frequency) {
            newError.frequency = "Frequency is required"
        }
        if (!subsData.paid) {
            newError.paid = "Paid is required"
        }
        if (!subsData.nextPaymentDate) {
            newError.nextPaymentDate = "Next Payment Date is required"
        }
        if (!subsData.file) {
            newError.file = "Receipt is required"
        }
        setErrors(newError);

        return Object.keys(newError).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubsData(prevState => ({ ...prevState, [name]: value }));
    }

    return (
        <DataContext.Provider value={{ subsData, handleSubmit, handleChange, handleFileChange, errors, subs, handleRemove, handleViewFile }}>
            {children}
        </DataContext.Provider>
    )
}
