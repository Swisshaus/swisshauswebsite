import mailchimp from '@mailchimp/mailchimp_marketing';

// Configure Mailchimp with your API key and server prefix
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., 'us1'
});

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Validate the form data
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({ error: 'Please fill out all required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // For debugging purposes
    console.log('Form submission received:', formData);
    
    try {
      // 1. Add the contact to a Mailchimp audience/list
      // Replace 'YOUR_AUDIENCE_ID' with your actual Mailchimp audience ID
      const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
      
      // Add member to list
      await mailchimp.lists.addListMember(audienceId, {
        email_address: formData.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: formData.firstName,
          LNAME: formData.lastName,
          PHONE: formData.phone || '',
        },
        tags: ['website-contact']
      });
      
      // 2. Optional: Send a campaign or automation email
      // This would require additional setup in your Mailchimp account
      
      // 3. Store the message in a Mailchimp custom object or notes
      // You can use Mailchimp's note feature to store the message
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Your message has been sent and you have been added to our contact list.' 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
      
    } catch (mailchimpError) {
      console.error('Mailchimp error:', mailchimpError);
      
      // Check if it's a "Member Exists" error (code 409)
      if (mailchimpError.status === 409) {
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Your message has been sent. It looks like you\'re already on our contact list.' 
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      throw mailchimpError;
    }
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process your request. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}