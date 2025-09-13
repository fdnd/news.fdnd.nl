import {
  APPROVED_DOMAINS,
  EMAIL_FROM,
  EMAIL_HOST,
  EMAIL_PASS,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_USER,
  JWT_SECRET,
} from '$env/static/private'

import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const allowedDomains = APPROVED_DOMAINS.split(',')

export function allowedDomain(email) {
  return allowedDomains.includes(email.split('@')[1])
}

export async function generateToken(email, base_url) {
  const payload = {
    email,
    expiration: Math.floor(Date.now() / 1000) + 3600, // link expires in 1 hour
  }
  const token = jwt.sign(payload, JWT_SECRET)
  return `${base_url.origin}/auth/${token}`
}

export async function sendMail(email, magic_link) {
  console.log('Sending email...')
  const transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: parseInt(EMAIL_PORT),
    secure: EMAIL_SECURE === 'true',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  })
  await transport
    .sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: 'FDND News Magic Link',
      html: `
        <h1>Welcome to FDND News</h1>
        <p>Click the link below for access:</p>
        <a href="${magic_link}">${magic_link}</a>
        <p>NB: This link will expire in 1 hour.</p>
      `,
    })
    .catch((error) => {
      console.error(`...error sending mail: ${error}`)
      throw error
    })
  console.log('...succes sending email!')
}

export function verify(token) {
  const payload = jwt.verify(token, JWT_SECRET)
  return payload.email || null
}
