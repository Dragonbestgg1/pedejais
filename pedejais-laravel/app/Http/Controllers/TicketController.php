<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;

class TicketController extends Controller
{
    public function store(Request $request)
    {
        $ticket = new Ticket;
        $ticket->film_id = $request->film_id;
        $ticket->activity_id = $request->activity_id;
        $ticket->seat_number = $request->seat_number;
        $ticket->price = $request->price;
        $ticket->status = $request->status;
        $ticket->save();
    
        // Return the ID of the newly created ticket
        return response()->json(['message' => 'Ticket created successfully', 'ticket_id' => $ticket->id]);
    }
    

    public function update(Request $request, $id)
    {
        $ticket = Ticket::find($id);
        $ticket->film_id = $request->film_id;
        $ticket->activity_id = $request->activity_id;
        $ticket->seat_number = implode(',', $request->seat_number);
        $ticket->price = $request->price;
        $ticket->status = $request->status;
        $ticket->save();

        return response()->json(['message' => 'Ticket updated successfully']);
    }
}
