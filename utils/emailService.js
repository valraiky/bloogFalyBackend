import nodemailer from "nodemailer";

export const sendResetEmail = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "valeurinpavart@gmail.com",
      pass: "mmdz tayt ivtm lfwb",
    },
  });

  const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

  const mailOptions = {
    from: "valeurinpavart@gmail.com",
    to: "mccodertafmc@gmail.com",
    subject: "Réinitialisation de mot de passe",
    text: `Clique sur ce lien pour réinitialiser ton mot de passe : ${resetURL}`,
  };

  await transporter.sendMail(mailOptions);
};
