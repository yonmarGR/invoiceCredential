export function Hero() {
  return(
    <section 
      className="relative flex flex-col items-center justify-center py-12 lg:py-20"
    >
      <div className="text-center">
        <span 
          className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full"
        >
          Introducing Invoice
        </span>
        <h1
          className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter"
        >
          Invoicing made{" "} 
          <span className="bolck -mt-2 bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text">easy!</span>
        </h1>

        <p className="max-w-xl mx-auto mt-4 lg:text-lg text-muted-foreground">
          Creating Invoices now is super easy, so you can get paid in time!
        </p>
      </div>
    </section>
  )
}