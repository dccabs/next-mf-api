import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const getConfig = async (req, res) => {
    const supabase = createPagesServerClient({ req, res })

    const { data, error } = await supabase
        .from('sologic_config').update({ remote_url: req.body.remote_url, remote_name: req.body.remote_name })
        .eq('id', req.body.id)
        .select('*')

    const { data: newData, error:newDataError } = await supabase
        .from('sologic_config')
        .select('*').order('id', { ascending: false })

    if (data) return res.status(200).json(newData)
    else return res.status(500).json(error)
}

export default getConfig
