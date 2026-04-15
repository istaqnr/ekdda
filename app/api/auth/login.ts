export default function handler(req: any, res: any) {
   res.redirect(307, `/login/loginError?callBackURL=${req.query.callbackUrl}`);
}
