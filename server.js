const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve os arquivos estáticos do diretório atual

// Rota para processar o email da newsletter
app.post('/api/newsletter', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Enviar email usando EmailJS
        const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_USER_ID,
            template_params: {
                to_email: email,
                from_name: '20Pilla',
                message: 'Obrigado por se cadastrar em nossa newsletter!'
            }
        });
        
        res.status(200).json({ message: 'Email cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao processar email:', error);
        res.status(500).json({ error: 'Erro ao processar o cadastro' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 