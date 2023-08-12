import jwt from 'jsonwebtoken';

const tokenCheckMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, 'prijatna_kafica_dragi_prijatelji');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Auth failed! Invalid token!' })
    }
};

export default tokenCheckMiddleware;