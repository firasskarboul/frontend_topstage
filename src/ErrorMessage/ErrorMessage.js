const ErrorMessage = ({children}) => 
{
    return (
        <div
            style={{
                width:"100%",
                padding: 10,
                marginBottom:10,
                borderRadius: 4,
                backgroundColor:"orangered",
                color:"white",
                textTransform: "capitalize",
                textStyle:"bold",
                textAlign:"center",
                fontStyle:"bold",
                marginTop : "0.5cm"
            
                
            }}
>
    {children}
        </div>
    );
};
export default ErrorMessage;