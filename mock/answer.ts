const answers: any[] = []

export default [
    {
        url: '/api/postAnswer',
        method: 'post',
        response(config) {
            console.log("🚀 ~ file: answer.ts:8 ~ response ~ config:", config)
            const { body } = config;
            console.log("🚀 ~ file: answer.ts:9 ~ response ~ body:", body)
            answers.push(body);
            console.log('userList', answers);
            return {
                code: 200,
                messages: 'success',
                data: body,
                success: true
            };
        },
    },
]