import Card from '../components/card'

export default function repository() {
    return (
        <>  
            <div className = "flex justify-center flex-col items-center">
                <h1 className = "text-2xl font-sans font-semibold my-5">Discover Professors at UofT!</h1>
                
                <div className = "grid-cols-3 grid space-x-4 space-y-4">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />

                </div>
            </div>
        </>
    );
}
