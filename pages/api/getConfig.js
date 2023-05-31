import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const getConfig = async (req, res) => {
    const supabase = createPagesServerClient({ req, res })

    const { data, error } = await supabase
        .from('sologic_config')
        .select('*').order('id', { ascending: false })

    if (data) return res.status(200).json(data)
    else return res.status(500).json(error)
}

export default getConfig
