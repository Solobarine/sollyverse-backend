const { createClient } = require('@supabase/supabase-js')
const { v4 } = require('uuid')


const uploadToSupabase = async (files, name, country) => {
    console.log(files);
    console.log(process.env.SUPABASE_API_KEY);
    const supabaseUrl = 'https://qwfbcbeqqtejvgluxtha.supabase.co'
    const supabaseKey = process.env.SUPABASE_API_KEY

    const supabase = createClient(supabaseUrl, supabaseKey)
    const user = supabase.auth.admin
    console.log(user);
    try {
    const sendFiles = files.map(async (file, index) => {
        if (index < 3) {
            const urls = await supabase.storage.from('city_images_bucket').upload(`${country}/${name}/${v4() + file.originalname}`, file.buffer, {
                'contentType': file.mimetype
            }).then(res => {
                console.log(res.data.path);
                if (res.data) {
                    const url = supabase.storage.from('city_images_bucket').getPublicUrl(res.data.path)
                    return url.data.publicUrl
                } else {
                    console.log(res.error);
                    return res.error
                }
            })
            return urls
        }
    })
    return Promise.all(sendFiles)
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = uploadToSupabase