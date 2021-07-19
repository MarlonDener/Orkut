import { SiteClient } from 'datocms-client';

export default async function getRequest(request, response) {
    if (request.method === 'POST') {
        const TOKEN = 'ddbd77159d4458131b964bc034066e';
        const client = new SiteClient(TOKEN);


        const registerCreate = await client.items.create({
            itemType: '976591',
            ...request.body,
            //    title: "Comunidade Marlon",
            //   image: "https://github.com/MarlonDener.png",
            // creatorSlug: 'MarlonDener'
        })

        response.json({
            dados: "algum dado",
            registerCreate: registerCreate,
        })
        return;
    }

    response.status(404).json({
        message: "Acesso proibido"
    })
}