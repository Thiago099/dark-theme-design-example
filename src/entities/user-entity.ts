export interface user{
    id: number;
    name: string;
    email: string;
    phone: string;
}

export const table_fields : string[] = [
    "name",
    "email",
    "phone"
]

export const form_fields = [
    {
        name:"Basic Information",
        fields:[
            {
                name: "Name",
                field:"name",
                placeholder: "Enter your name",
                col:"col-4",
                required:true,
                blur:{
                    message:"Name is too short",
                    condition(item:string){
                        return (item || '').length < 3;
                    }
                }
                
            } ,
            {
                name: "Email",
                field:"email",
                placeholder: "Enter email",
                col:"col-4",
                required:true,
                info:"We will never share your email with anyone else.",
                submit:{
                    message:"Invalid email",
                    condition(item:string){
                        return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(item);
                    }

                }
            },
            {
                name: "Phone number",
                field:"phone",
                placeholder: "Enter phone number",
                col:"col-4",
                required:true,
            },
        ] as any[]
    },
]
