export const sendEmail = async (emailData) => {
  // Simulación de enviar un correo electrónico
  console.log('Enviando correo electrónico a:', emailData.to);
  console.log('Asunto:', emailData.subject);
  console.log('Cuerpo:', emailData.body);
  console.log('Adjunto:', emailData.attachment);
  console.log('Correo electrónico enviado con éxito.');
};
