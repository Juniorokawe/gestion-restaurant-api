//stockage temporaire pour les clé secrete depuis pvit
let cachedSecretKey = null;

//routes call-back pour recevoir la clé secrete depuis pvit
app.post("/api/payment/secret-callback",(req,res)=>{
    const {secret_key,  } = req.body;

   if (!secret_key) {
        return res.status(400).json({ error: "Secret key is required." });
    }
    cachedSecretKey = secret_key
    // Respond with a success message
    res.status(200).json({ message: "Payment status received successfully." });
});