from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'type', 'amount', 'payment_method', 'reason', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Le montant doit être supérieur à 0")
        return value

    def validate(self, data):
        user = self.context['request'].user
        if data['type'] == 'withdrawal':
            # Vérifier le solde disponible
            total_balance = user.get_balance()  # À implémenter dans le modèle User
            if data['amount'] > total_balance:
                raise serializers.ValidationError("Solde insuffisant pour effectuer ce retrait")
        return data 