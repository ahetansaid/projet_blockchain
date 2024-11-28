from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Transaction
from .serializers import TransactionSerializer
from django.db.models import Sum
from decimal import Decimal

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_transaction(request):
    serializer = TransactionSerializer(
        data=request.data,
        context={'request': request}
    )
    
    if serializer.is_valid():
        transaction = serializer.save(user=request.user)
        
        # Vérifier les conditions du smart contract
        if transaction.type == 'withdrawal':
            # Implémenter ici les règles du smart contract
            pass
            
        transaction.status = 'completed'
        transaction.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_balance(request):
    user = request.user
    deposits = Transaction.objects.filter(
        user=user,
        type='deposit',
        status='completed'
    ).aggregate(total=Sum('amount'))['total'] or Decimal('0')
    
    withdrawals = Transaction.objects.filter(
        user=user,
        type='withdrawal',
        status='completed'
    ).aggregate(total=Sum('amount'))['total'] or Decimal('0')
    
    balance = deposits - withdrawals
    
    return Response({
        'balance': balance,
        'total_saved': deposits,
        'goal': user.saving_goal  # À ajouter au modèle User
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_transactions(request):
    transactions = Transaction.objects.filter(user=request.user)
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data) 