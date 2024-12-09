import NextAuth from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Email & Password',
            credentials:{
                email:{label:"Email", type:"email"},
                password:{label:"Password", type:"password"},
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password) return null;
                const user = await prisma.user.findUnique({
                    where:{email:credentials.email}
                });
                if (!user) return null;
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (isValid){ return {id:user.id.toString(), email:user.email, name:user.name};}
                return null;
        },
}),
    ],
pages:{
    signIn: "/auth/signIn",
},
session:{
    strategy:"jwt"
},
secret:process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };