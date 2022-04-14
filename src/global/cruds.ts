import { form_fields, table_fields } from '@/entities/user-entity';
import data from '@/entities/user-data.json';
//source https://www.mockaroo.com/"
export default [
    {
        name:'user',
        title:'Users',
        data: data,
        table_fields: table_fields,
        form_fields: form_fields
    }
]